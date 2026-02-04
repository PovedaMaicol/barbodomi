export interface Negocio {
  id: number;
  name: string;
  address: string;
  phone: string;
  description?: string;
  email: string;
  website?: string;
  category?: string;
  img_url?: string;
  created_at?: Date;
}
