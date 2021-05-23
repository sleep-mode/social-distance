class AmountRenderer {
  private el: any;
  private amount = 0;

  public findElement() {
    this.el = document.getElementById('coin-amount');
  }

  public setZero() {
    if (this.el == null) return;
    this.amount = 0;
    this.el.textContent = 0;
  }

  public render(amount: number) {
    if (this.amount === amount) return;
    if (this.el == null) return;
    this.el.textContent = String(amount);
    this.amount = amount;
  }
}

export const amountRenderer = new AmountRenderer();
