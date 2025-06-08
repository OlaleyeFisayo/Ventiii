export type AppFormItems = {
  tag: string;
  type: string;
  value: any;
  placeholder?: string;
  securePassword?: boolean;
  label?: string;
  icon?: string;
  maxFile?: number;
  maxFileSize?: number;
};

export type CreateEventPayload = {
  title: string;
  description: string;
  date: {
    start: string;
    end: string;
  };
  time: {
    start: string;
    end: string;
  };
  location: string;
  coverPicture: string;
};
