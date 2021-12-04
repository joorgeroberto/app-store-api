import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Category } from "./Category";
import { Image } from "./Image";

@Entity("apps")
export class App {
  @PrimaryColumn()
  id: number;
  
  @Column()
  name: string;

  @Column()
  developer: string;

  @Column()
  rate: string;

  @OneToMany(
    () => Image, 
    Image => Image.app
  )
  images: Image[];

  @Column()
  category_id: string;

  @Column()
  description: string;
  
  @ManyToOne(
    () => Category, 
    Category => Category.apps,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )

  @JoinColumn({name: 'category_id', referencedColumnName: 'id'})
  category: Category;
}