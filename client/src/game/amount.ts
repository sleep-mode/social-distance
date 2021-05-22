class AmountRenderer {
  private el: any;
  private amount = 0;

  public findElement() {
    this.el = document.getElementById('coin-amount');
  }

  public render(amount: number) {
    if (this.amount === amount) return;
    if (this.el == null) return;
    this.el.textContent = String(amount);
  }
}

export const amountRenderer = new AmountRenderer();
