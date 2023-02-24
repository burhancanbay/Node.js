import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Category } from "../entity/Category";

export class CategoryController {
  private categoryRepository = AppDataSource.getRepository(Category);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.categoryRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      return "unregistered category";
    }
    return category;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { categoryName } = request.body;

    const category = Object.assign(new Category(), {
      categoryName,
    });

    return this.categoryRepository.save(category);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let categoryToUpdate = await this.categoryRepository.findOneBy({ id });

    if (!categoryToUpdate) {
      return "this category not exist";
    }

    this.categoryRepository.merge(categoryToUpdate, request.body);

    return await this.categoryRepository.save(categoryToUpdate);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let categoryToRemove = await this.categoryRepository.findOneBy({ id });

    if (!categoryToRemove) {
      return "this category not exist";
    }

    return await this.categoryRepository.remove(categoryToRemove);
  }
}
