import {Entity, PrimaryGeneratedColumn, Column, OneToMany,CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Match } from "./match";

@Entity()
export class Tournament {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@OneToMany(_type => Match, (match: Match) => match.tournament )
	matches!: Array<Match>

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}