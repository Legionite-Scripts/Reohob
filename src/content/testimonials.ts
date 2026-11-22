/**
 * Real customer quotes only. Add one when a customer has agreed to be quoted.
 * While this list is empty, the Home page shows labelled placeholder slots in
 * placeholder mode and hides the section entirely at launch.
 */
export type Testimonial = { quote: string; name: string; detail: string };

export const testimonials: Testimonial[] = [];
