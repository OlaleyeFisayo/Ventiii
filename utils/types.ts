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
  optional?: boolean;
};

export type CreateEventState = {
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
  coverPicture: File[];
};

export type GetEventsResponse = {
  events: {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    coverPictureUrl: string;
  }[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

export type GetEventResponse = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  coverPictureUrl: string;
  logoUrl: string;
  userId: number;
  hasSpeakers: boolean;
  createdAt: number;
  updatedAt: number;
};

export type CreateSpeakerPayload = {
  name: string;
  title?: string;
  company?: string;
  bio?: string;
  image: string;
  socialLinks: Record<string, string> | null;
};

export type GetSpeakerResponse = {
  id: number;
  eventId: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
  socialLinks: null | Record<string, string>;
};
