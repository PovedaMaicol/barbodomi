/* eslint-disable */
import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SupabaseService } from './supabase.service';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Supabase Storage')
@Controller('supabase')
export class SupabaseController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Post('upload/:bucketName')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Subir archivo a Supabase Storage' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'bucketName',
    description: 'Nombre del bucket donde subir el archivo',
  })
  @ApiResponse({ status: 201, description: 'Archivo subido exitosamente' })
  @ApiResponse({ status: 400, description: 'Error en la subida del archivo' })
  async uploadFile(
    @Param('bucketName') bucketName: string,
    @UploadedFile() file: Express.Multer.File,
    @Query('fileName') fileName?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No se ha proporcionado ningún archivo');
    }

    if (!bucketName) {
      throw new BadRequestException('El nombre del bucket es requerido');
    }

    try {
      const result = await this.supabaseService.uploadFile(
        bucketName,
        file.buffer,
        file.mimetype,
        fileName || file.originalname,
      );

      return {
        success: true,
        message: 'Archivo subido exitosamente',
        data: {
          path: result.path,
          publicUrl: result.publicUrl,
          fileName: result.fileName,
          originalName: file.originalname,
          size: file.size,
          mimeType: file.mimetype,
        },
      };
    } catch (error) {
      throw new BadRequestException(`Error al subir archivo: ${error.message}`);
    }
  }

  @Delete('file/:bucketName/:fileName')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar archivo de Supabase Storage' })
  @ApiParam({ name: 'bucketName', description: 'Nombre del bucket' })
  @ApiParam({ name: 'fileName', description: 'Nombre del archivo a eliminar' })
  @ApiResponse({ status: 200, description: 'Archivo eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Archivo no encontrado' })
  async deleteFile(
    @Param('bucketName') bucketName: string,
    @Param('fileName') fileName: string,
  ) {
    if (!bucketName || !fileName) {
      throw new BadRequestException(
        'El nombre del bucket y del archivo son requeridos',
      );
    }

    try {
      const result = await this.supabaseService.deleteFile(
        bucketName,
        fileName,
      );

      return {
        success: true,
        message: result
          ? 'Archivo eliminado exitosamente'
          : 'Archivo no encontrado',
        data: result,
      };
    } catch (error) {
      throw new BadRequestException(
        `Error al eliminar archivo: ${error.message}`,
      );
    }
  }

  @Get('url/:bucketName/:fileName')
  @ApiOperation({ summary: 'Obtener URL pública de un archivo' })
  @ApiParam({ name: 'bucketName', description: 'Nombre del bucket' })
  @ApiParam({ name: 'fileName', description: 'Nombre del archivo' })
  @ApiResponse({ status: 200, description: 'URL obtenida exitosamente' })
  async getPublicUrl(
    @Param('bucketName') bucketName: string,
    @Param('fileName') fileName: string,
  ) {
    if (!bucketName || !fileName) {
      throw new BadRequestException(
        'El nombre del bucket y del archivo son requeridos',
      );
    }

    try {
      const publicUrl = this.supabaseService.getPublicUrl(bucketName, fileName);

      return {
        success: true,
        message: 'URL obtenida exitosamente',
        data: {
          publicUrl,
          bucketName,
          fileName,
        },
      };
    } catch (error) {
      throw new BadRequestException(`Error al obtener URL: ${error.message}`);
    }
  }

  @Get('test-connection')
  @ApiOperation({ summary: 'Probar conexión con Supabase' })
  @ApiResponse({ status: 200, description: 'Conexión exitosa' })
  async testConnection() {
    try {
      const client = this.supabaseService.getClient();

      // Intentar obtener la lista de buckets para probar la conexión
      const { data, error } = await client.storage.listBuckets();

      if (error) {
        throw error;
      }

      return {
        success: true,
        message: 'Conexión con Supabase exitosa',
        data: {
          bucketsCount: data?.length || 0,
          buckets: data?.map((bucket) => bucket.name) || [],
        },
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error en la conexión con Supabase',
        error: error.message,
      };
    }
  }

  @Get('buckets')
  async listBuckets(): Promise<any> {
    try {
      const client = this.supabaseService.getAdminClient(); // Cambiar a getAdminClient()
      const { data, error } = await client.storage.listBuckets();

      if (error) throw error;

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Get('files/:bucketName')
  @ApiOperation({ summary: 'Listar archivos en un bucket' })
  @ApiParam({ name: 'bucketName', description: 'Nombre del bucket' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Límite de archivos a mostrar',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Offset para paginación',
  })
  @ApiResponse({ status: 200, description: 'Archivos obtenidos exitosamente' })
  async listFiles(
    @Param('bucketName') bucketName: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<any> {
    try {
      const client = this.supabaseService.getClient();
      const { data, error } = await client.storage.from(bucketName).list('', {
        limit: limit ? parseInt(limit.toString()) : 100,
        offset: offset ? parseInt(offset.toString()) : 0,
      });

      if (error) {
        throw error;
      }

      return {
        success: true,
        message: 'Archivos obtenidos exitosamente',
        data: data || [],
        bucketName,
      };
    } catch (error) {
      throw new BadRequestException(
        `Error al obtener archivos: ${error.message}`,
      );
    }
  }
}
