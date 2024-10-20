export interface Exhibit {
  id?: number; // Первинний ключ, необов'язковий при створенні нового експонату
  name: string; // Назва експонату
  author?: string; // Автор
  created_date?: Date; // Дата створення
  materials?: string; // Матеріали
  description?: string; // Опис
  condition: string; // Стан
  restoration_history?: string; // Історія реставрацій
  location_id: number; // Ідентифікатор локації (зовнішній ключ)
}
