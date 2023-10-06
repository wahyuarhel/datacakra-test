export interface DestinationResponseType {
  status: boolean;
  message: string;
  data: DataOfDestinationType;
}

export interface DataOfDestinationType {
  current_page: number;
  data: DataOfDestinationDataType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: DestinationLinkType[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface DataOfDestinationDataType {
  id: number;
  created_at: Date;
  updated_at: Date;
  title: string;
  description: string;
  thumbnail: null;
  created_by: number;
  average_rating: number;
  reviews: ReviewOfDestinationType[];
}

export interface ReviewOfDestinationType {
  id: number;
  created_at: Date;
  updated_at: Date;
  description: string;
  rating: number;
  user_id: number;
  destination_id: number;
}

export interface DestinationLinkType {
  url: null | string;
  label: string;
  active: boolean;
}
