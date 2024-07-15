export interface Data {
  hasNext: boolean;
  testimonials: Array<Testimonial>;
}

export interface Testimonial {
  id: number;
  message: string;
}
