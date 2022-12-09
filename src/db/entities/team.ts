import {Entity, PrimaryGeneratedColumn, Column, OneToMany,CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Match } from "./match";

@Entity()
export class Team {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@OneToMany(_type => Match, (match: Match) => match.homeTeam )
	homeMatches!: Array<Match>

	@OneToMany(_type => Match, (match: Match) => match.awayTeam )
	awayMatches!: Array<Match>

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}