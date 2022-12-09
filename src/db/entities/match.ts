import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,CreateDateColumn, UpdateDateColumn, JoinColumn} from "typeorm";
import { Team } from "./team";
import { Tournament } from "./tournament";

@Entity()
export class Match {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	date!: Date;

	@Column({ default: 0 })
	scoredHomeTeam!: number;

	@Column({ default: 0 })
	scoredAwayTeam!: number;

	@ManyToOne(_type => Team, (team: Team) => team.homeMatches)
	@JoinColumn()
	homeTeam!: Team;

	@ManyToOne(_type => Team, (team: Team) => team.awayMatches)
	@JoinColumn()
	awayTeam!: Team;

	@ManyToOne(_type => Tournament, (tournament: Tournament) => tournament.matches)
	@JoinColumn()
	tournament!: Tournament;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}