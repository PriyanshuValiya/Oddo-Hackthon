"use client";
import { useState, useEffect } from "react";
import { Pencil, Check, X, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateBudget } from "@/actions/budget";

export function BudgetProgress({ initialBudget, currentExpenses }) {
  const defaultBudget = { amount: 0 };
  initialBudget = initialBudget || defaultBudget;

  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(initialBudget?.amount?.toString() || "0");
  const [isOverspent, setIsOverspent] = useState(false);
  const [suggestedPlan, setSuggestedPlan] = useState(null);
  const [reductionType, setReductionType] = useState("percentage");
  const [reductionValue, setReductionValue] = useState("");
  const [reductionAmount, setReductionAmount] = useState(0);
  const [recoveryDays, setRecoveryDays] = useState(null);
  const [recoveredAmount, setRecoveredAmount] = useState("");
  const [remainingOverspent, setRemainingOverspent] = useState(0);
  const [currentExpenses, setCurrentExpenses] = useState(initialExpenses);

  useEffect(() => {

    const overspent = currentExpenses - initialBudget.amount;
    if (initialBudget && overspent > 0) {

      setIsOverspent(true);
      setRemainingOverspent(overspent);
      setSuggestedPlan(`You're over budget! Adjust your spending for the coming months.`);
    } else {
      setIsOverspent(false);
      setSuggestedPlan(null);
      setRemainingOverspent(0);
    }
  }, [currentExpenses, initialBudget]);

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    try {
      await updateBudget(amount); // Update backend
  
      // ✅ Manually update UI without waiting for a prop update
      initialBudget.amount = amount; // Temporary fix to reflect changes immediately
  
      setIsEditing(false);
      toast.success("Budget updated successfully!");
    } catch (error) {
      console.error("Error updating budget:", error);
      toast.error("Failed to update budget. Try again.");
    }
  };
  
  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  const percentUsed = (currentExpenses / initialBudget.amount) * 100 || 0;


  const handleRecoveryPlan = () => {
    if (!reductionValue || isNaN(parseFloat(reductionValue)) || parseFloat(reductionValue) <= 0) {
      toast.error("Please enter a valid reduction value.");
      return;
    }

    let reductionInRupees = reductionType === "percentage"
      ? (parseFloat(reductionValue) / 100) * initialBudget.amount
      : parseFloat(reductionValue);

    setReductionAmount(reductionInRupees.toFixed(2));

    // **Calculate how many months are needed to recover overspending**
    let monthsToRecover = Math.floor(remainingOverspent / reductionInRupees);
    let extraAmount = remainingOverspent % reductionInRupees;
    let extraDays = extraAmount > 0 ? Math.ceil((extraAmount / reductionInRupees) * 30) : 0; // Convert remaining to days

    const recoveryMessage =
      monthsToRecover > 0
        ? `${monthsToRecover} month(s) and ${extraDays} days`
        : `${extraDays} days`;

    setRecoveryDays(recoveryMessage);
  };

  const handleRecoverAmount = () => {
    const amountRecovered = parseFloat(recoveredAmount);
    if (isNaN(amountRecovered) || amountRecovered <= 0) {
      toast.error("Please enter a valid recovery amount.");
      return;
    }

    if (amountRecovered > remainingOverspent) {
      toast.error("You cannot recover more than the overspent amount.");
      return;
    }

    const newRemainingOverspent = remainingOverspent - amountRecovered;
    setRemainingOverspent(newRemainingOverspent);
    setCurrentExpenses((prev) => prev - amountRecovered);

    if (newRemainingOverspent <= 0) {
      setIsOverspent(false);
      toast.success("Overspent amount fully recovered!");
    } else {
      toast.success(`You recovered ₹${amountRecovered}. Remaining overspent: ₹${newRemainingOverspent}`);
    }

    setRecoveredAmount(""); // Reset input field
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-sm font-medium">Monthly Budget (Default Account)</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-32"
                  placeholder="Enter amount"
                  autoFocus
                />
                <Button variant="ghost" size="icon" onClick={handleUpdateBudget}>
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleCancel}>
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <CardDescription>
                  {initialBudget
                    ? `₹${currentExpenses.toFixed(2)} of ₹${initialBudget.amount.toFixed(2)} spent`
                    : "No budget set"}
                </CardDescription>
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} className="h-6 w-6">
                  <Pencil className="h-3 w-3" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {initialBudget && (
          <div className="space-y-2">
            <Progress
              value={percentUsed}
              extraStyles={percentUsed > 100 ? "bg-red-500" : percentUsed >= 90 ? "bg-yellow-500" : "bg-green-500"}
            />
            <p className="text-xs text-muted-foreground text-right">{percentUsed.toFixed(1)}% used</p>
          </div>
        )}

        {isOverspent && (
          <div className="mt-4 p-3 bg-blue-100 text-blue-700 rounded-md">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>You have exceeded your budget! Adjust spending for the coming months.</span>
            </div>

            {/* Recovery Plan */}
            <div className="mt-4">
              <p className="text-sm font-medium">Choose reduction type:</p>
              <Select onValueChange={setReductionType} value={reductionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="amount">Fixed Amount (₹)</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder={`Enter ${reductionType === "percentage" ? "percentage" : "amount"} `}
                className="mt-2"
                value={reductionValue}
                onChange={(e) => setReductionValue(e.target.value)}
              />
              <Button className="mt-2" onClick={handleRecoveryPlan}>Calculate Recovery Time</Button>
              {recoveryDays && <p className="text-sm mt-2">Estimated recovery time: {recoveryDays}</p>}

              <Input
                type="number"
                placeholder="Enter amount recovered"
                className="mt-2"
                value={recoveredAmount}
                onChange={(e) => setRecoveredAmount(e.target.value)}
              />
              <Button className="mt-2" onClick={handleRecoverAmount}>Apply Recovery</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
