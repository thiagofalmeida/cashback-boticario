class CalculateCashback {
  public static calculatePercentage(value: number): number {
    return value < 1000 ? 10 : value < 1500 ? 15 : 20;
  }

  public static calculateReturnValue(value: number): number {
    return value * (value < 1000 ? 0.1 : value < 1500 ? 0.15 : 0.2);
  }
}

export default CalculateCashback;
