import { Ref, unref } from 'vue'

export const isAvailableArray = (arr: unknown[] | Ref[]) =>
  Array.isArray(unref(arr)) && unref(arr).length > 0
