export interface BaseClientOptionType {
  disabled?: boolean
}

export interface BaseClientType<O extends BaseClientOptionType = BaseClientOptionType> {
  /**
   *返回配置项
   *
   * @return {*}  {O}
   * @memberof BaseClientType
   */
  getOptions(): O

  /**
   * 销毁所有事件
   *
   * @memberof BaseClientType
   */
  destory(): void
}
