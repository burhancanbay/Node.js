import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";

import { Team } from "../entity/Team";

export class TeamController {
  private teamRepository = AppDataSource.getRepository(Team);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.teamRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const team = await this.teamRepository.findOne({
      where: { id },
    });

    if (!team) {
      return "unregistered team";
    }
    return team;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { teamName } = request.body;

    const team = Object.assign(new Team(), {
      teamName,
    });

    return this.teamRepository.save(team);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let updatedTeam = await this.teamRepository.findOneBy({ id });

    if (!updatedTeam) {
      return "this team not exist";
    }
    this.teamRepository.merge(updatedTeam, request.body);

    return await this.teamRepository.save(updatedTeam);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let teamToRemove = await this.teamRepository.findOneBy({ id });

    if (!teamToRemove) {
      return "this team not exist";
    }

    return await this.teamRepository.remove(teamToRemove);
  }
}
