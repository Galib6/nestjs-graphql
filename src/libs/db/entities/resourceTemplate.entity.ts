import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'ResourceTemplate' })
export class ResourceTemplateEntity {
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
  schema: any;

  @Column({ nullable: true })
  integrationId: string;

  @Column({ type: 'text', nullable: true })
  functionString: string;

  @Column({ nullable: true })
  key: string;

  @Column({ type: 'json', nullable: true })
  platforms: any;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];
}
