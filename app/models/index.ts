import { Model, model, models } from 'mongoose'

import { AdminInterface, AdminSchema } from './admin'
import { FeatureInterface, FeatureSchema } from './feature'
import { ImageInterface, ImageSchema } from './image'
import { RoleInterface, RoleSchema } from './role'
import { ServiceInterface, ServiceSchema } from './service'
import { SubscriberInterface, SubscriberSchema } from './subscriber'
import { PublicationInterface, PublicationSchema } from './publication'
import { ProductInterface, ProductSchema } from './product'
import { TestimonialInterface, TestimonialSchema } from './testimonial'
import { UserInterface, UserSchema } from './user'

export const Admin = models.Admin as Model<AdminInterface> || model<AdminInterface>("Admin", AdminSchema)
export const Feature = models.Feature as Model<FeatureInterface> || model<FeatureInterface>("Feature", FeatureSchema)
export const Image = models.Image as Model<ImageInterface> || model<ImageInterface>("Image", ImageSchema)
export const Role = models.Role as Model<RoleInterface> || model<RoleInterface>("Role", RoleSchema)
export const Service = models.Service as Model<ServiceInterface> || model<ServiceInterface>("Service", ServiceSchema)
export const Subscriber = models.Subscriber as Model<SubscriberInterface> || model<SubscriberInterface>("Subscriber", SubscriberSchema)
export const Product = models.Product as Model<ProductInterface> || model<ProductInterface>("Product", ProductSchema)
export const Publication = models.Publication as Model<PublicationInterface> || model<PublicationInterface>("Publication", PublicationSchema)
export const Testimonial = models.Testimonial as Model<TestimonialInterface> || model<TestimonialInterface>("Testimonial", TestimonialSchema)
export const User = models.User as Model<UserInterface> || model<UserInterface>("User", UserSchema)
