export interface BookModel {
  id: string;
  booking_details_status: string | null;
  category_id: string | null;
  wishlisted: boolean;
  tags: Array<string>;
  download_url: string | null;
  type: string;
  title: string;
  isbn: string;
  author: string;
  description: string;
  copy_number: string;
}
