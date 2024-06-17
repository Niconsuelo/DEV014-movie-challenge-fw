import Movie from "./Movie";
import Metadata from "./MetaData";

export interface ListPaginationMovie {
  metaData: Metadata;
  movies: Movie[];
}

export default ListPaginationMovie;
