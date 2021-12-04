import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { App } from "./App";

@Entity("image")
export class Image {
  @PrimaryColumn()
  id: number;
  
  @Column()
  url: string;

  @Column()
  app_id: boolean;

  @Column()
  is_icon: boolean;

  @ManyToOne(
    () => App, 
    App => App.images,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  @JoinColumn({name: 'app_id', referencedColumnName: 'id'})
  app: App;
}