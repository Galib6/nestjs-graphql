import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ResourceTemplateEntity } from './resourceTemplate.entity';

@Entity({ name: 'Action' })
export class ActionEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  functionString: string;

  @Column({ nullable: true })
  resourceTemplateId: string;

  @Column({ type: 'json', nullable: true })
  params: any;

  @ManyToOne(() => ResourceTemplateEntity, { nullable: true })
  @JoinColumn({ name: 'resourceTemplateId' })
  resourceTemplate: ResourceTemplateEntity;
}
