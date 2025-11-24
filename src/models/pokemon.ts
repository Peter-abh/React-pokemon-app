export interface Pokemon {
  id: number;
  name: string;
  picture: string;
  types: string[];
  /*Constructor(
    id: number = 100,
    name: string = '...',
    picture: string = '',
    types: Array<string> = ['normal'],
  ){
    this.id = id;
    this.name = name;
    this.picture = picture;
    this.types = types;
  }*/
}