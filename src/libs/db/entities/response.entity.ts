import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Response' })
export class ResponseEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'json' })
  platforms: {
    integrationId?: string;
    build?: number;
    localeGroups: {
      localeGroupId?: string;
      variations: {
        name: string;
        responses: any;
      }[];
    }[];
  }[];
}
