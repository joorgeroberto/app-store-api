import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { v4 as uuid } from 'uuid';
import { App } from "./App";

@Entity("category")
export class Category {
  @PrimaryColumn()
  id: string;
  
  @Column()
  name: string;

  @OneToMany(() => App, App => App.category)
  apps: App[];
}