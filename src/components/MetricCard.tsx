import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  variant?: "success" | "danger" | "primary" | "warning";
}

export const MetricCard = ({
  title,
  value,
  icon: Icon,
  trend,
  variant = "primary",
}: MetricCardProps) => {
  const variantStyles = {
    success: "from-success/10 to-success/5 border-success/20",
    danger: "from-destructive/10 to-destructive/5 border-destructive/20",
    primary: "from-primary/10 to-primary/5 border-primary/20",
    warning: "from-warning/10 to-warning/5 border-warning/20",
  };

  const iconStyles = {
    success: "bg-success/10 text-success",
    danger: "bg-destructive/10 text-destructive",
    primary: "bg-primary/10 text-primary",
    warning: "bg-warning/10 text-warning",
  };

  return (
    <Card
      className={cn(
        "p-6 bg-gradient-to-br transition-base hover:shadow-xl border",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </p>
        </div>
        <div className={cn("p-2 rounded-lg", iconStyles[variant])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-3xl font-bold">{value}</p>
        {trend && (
          <p className="text-sm text-muted-foreground">
            <span className={cn(
              "font-medium",
              trend.startsWith("+") ? "text-success" : "text-destructive"
            )}>
              {trend}
            </span>
            {" "}from last month
          </p>
        )}
      </div>
    </Card>
  );
};
