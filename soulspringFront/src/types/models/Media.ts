export interface Media {
  id: number;
  modelType: string;
  modelId: number;
  fileName: string;
  mimeType: string;
  title: string;
  isSupplementary: boolean;
  url: string;
  publicId: string;
}

export interface MediaApi {
  id: number;
  model_type: string;
  model_id: number;
  file_name: string;
  mime_type: string;
  title: string;
  is_supplementary: number;
}
