import { IFindTimeDTO } from './IFindTime.dto';

export interface IFindTimePaginatedDTO extends IFindTimeDTO {
  page: number;
  perPage: number;
}
