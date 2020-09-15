import { TCommonOptions } from './common-options';

export type TOptions<T> = Partial<T> & TCommonOptions;
