import Category from "../models/Category";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Category)
class CategoriesRepostiory extends Repository<Category>{

}

export default CategoriesRepostiory;