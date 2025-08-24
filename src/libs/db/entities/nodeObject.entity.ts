import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ActionEntity } from './action.entity';
import { ResponseEntity } from './response.entity';
import { TriggerEntity } from './trigger.entity';

@Entity({ name: 'NodeObject' })
export class NodeObjectEntity {
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

  @Column({ type: 'json', nullable: true })
  parentIds: string[];

  @Column({ default: false })
  root: boolean;

  @Column({ nullable: true })
  triggerId: string;

  @Column({ type: 'json', nullable: true })
  responseIds: string[];

  @Column({ type: 'json', nullable: true })
  actionIds: string[];

  @Column({ type: 'float', nullable: true })
  priority: number;

  @Column({ nullable: true })
  compositeId: string;

  @Column({ default: false })
  global: boolean;

  @Column({ nullable: true })
  colour: string;

  @ManyToMany(() => NodeObjectEntity)
  @JoinTable({
    name: 'node_parents',
    joinColumn: { name: 'nodeId', referencedColumnName: '_id' },
    inverseJoinColumn: { name: 'parentId', referencedColumnName: '_id' },
  })
  parents: NodeObjectEntity[];

  @ManyToOne(() => TriggerEntity, { nullable: true })
  @JoinColumn({ name: 'triggerId' })
  trigger: TriggerEntity;

  @ManyToMany(() => ResponseEntity)
  @JoinTable({
    name: 'node_responses',
    joinColumn: { name: 'nodeId', referencedColumnName: '_id' },
    inverseJoinColumn: { name: 'responseId', referencedColumnName: '_id' },
  })
  responses: ResponseEntity[];

  @ManyToMany(() => ActionEntity)
  @JoinTable({
    name: 'node_actions',
    joinColumn: { name: 'nodeId', referencedColumnName: '_id' },
    inverseJoinColumn: { name: 'actionId', referencedColumnName: '_id' },
  })
  actions: ActionEntity[];
}
