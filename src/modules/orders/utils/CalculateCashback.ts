type Response = {
  percentage: number;
  returnValue: number;
};

class CalculateCashback {
  public static calculate(value: number): Response {
    const percentage = value < 1000 ? 10 : value < 1500 ? 15 : 20;
    const returnValue =
      value * (value < 1000 ? 0.1 : value < 1500 ? 0.15 : 0.2);

    return { percentage, returnValue };
  }
}

export default CalculateCashback;
