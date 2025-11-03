import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, TrendingDown } from "lucide-react";

export const InvestmentsView = () => {
  const investments = [
    {
      id: 1,
      name: "Tech Stock Portfolio",
      invested: 50000,
      current: 62000,
      change: 24.0,
    },
    {
      id: 2,
      name: "Index Funds",
      invested: 30000,
      current: 33500,
      change: 11.7,
    },
    {
      id: 3,
      name: "Crypto Holdings",
      invested: 15000,
      current: 12500,
      change: -16.7,
    },
  ];

  const totalInvested = investments.reduce((sum, inv) => sum + inv.invested, 0);
  const totalCurrent = investments.reduce((sum, inv) => sum + inv.current, 0);
  const totalReturn = ((totalCurrent - totalInvested) / totalInvested) * 100;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Investments</h2>
          <p className="text-muted-foreground">Track your portfolio performance</p>
        </div>
        <Button className="gradient-success">
          <Plus className="w-4 h-4 mr-2" />
          Add Investment
        </Button>
      </div>

      <Card className="p-6 gradient-success border-0 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium text-success-foreground/80 mb-1">
              Total Invested
            </p>
            <p className="text-3xl font-bold text-success-foreground">
              {totalInvested.toLocaleString()} SEK
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-success-foreground/80 mb-1">
              Current Value
            </p>
            <p className="text-3xl font-bold text-success-foreground">
              {totalCurrent.toLocaleString()} SEK
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-success-foreground/80 mb-1">
              Total Return
            </p>
            <p className="text-3xl font-bold text-success-foreground flex items-center gap-2">
              {totalReturn > 0 ? "+" : ""}
              {totalReturn.toFixed(1)}%
              {totalReturn > 0 ? (
                <TrendingUp className="w-6 h-6" />
              ) : (
                <TrendingDown className="w-6 h-6" />
              )}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investments.map((investment) => {
          const profit = investment.current - investment.invested;
          const isPositive = investment.change > 0;

          return (
            <Card
              key={investment.id}
              className="p-6 gradient-card border-0 shadow-lg hover:shadow-xl transition-base"
            >
              <h3 className="font-semibold text-lg mb-4">{investment.name}</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Invested</p>
                  <p className="text-xl font-bold">
                    {investment.invested.toLocaleString()} SEK
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Current Value</p>
                  <p className="text-xl font-bold">
                    {investment.current.toLocaleString()} SEK
                  </p>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Return</span>
                    <div className="text-right">
                      <p
                        className={`font-bold ${
                          isPositive ? "text-success" : "text-destructive"
                        }`}
                      >
                        {isPositive ? "+" : ""}
                        {profit.toLocaleString()} SEK
                      </p>
                      <p
                        className={`text-sm ${
                          isPositive ? "text-success" : "text-destructive"
                        }`}
                      >
                        {isPositive ? "+" : ""}
                        {investment.change.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
