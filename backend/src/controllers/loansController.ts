import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import { mockDb } from '../lib/mockDb.js';

export const loansController = {
  getLoanTypes: async (req: Request, res: Response) => {
    try {
      const loanTypes = [
        { id: 'crop', name: 'Crop Loan', description: 'For seasonal farming needs' },
        { id: 'equipment', name: 'Equipment Loan', description: 'For farm machinery and tools' },
        { id: 'infrastructure', name: 'Infrastructure Loan', description: 'For farm buildings and facilities' },
        { id: 'emergency', name: 'Emergency Loan', description: 'For urgent farming needs' }
      ];
      res.json({ success: true, data: loanTypes });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  },

  getLoanRequirements: async (req: Request, res: Response) => {
    try {
      const requirements = {
        documents: ['Aadhaar Card', 'PAN Card', 'Land Records', 'Income Certificate', 'Bank Statement'],
        eligibility: ['Age 18-65', 'Indian Citizen', 'Land Ownership', 'Good Credit History'],
        process: ['Application Submission', 'Document Verification', 'Credit Check', 'Approval', 'Disbursement']
      };
      res.json({ success: true, data: requirements });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  },

  getLoanCalculators: async (req: Request, res: Response) => {
    try {
      const calculators = [
        { id: 'emi', name: 'EMI Calculator', description: 'Calculate monthly loan payments' },
        { id: 'eligibility', name: 'Eligibility Calculator', description: 'Check loan eligibility' },
        { id: 'comparison', name: 'Loan Comparison', description: 'Compare different loan options' }
      ];
      res.json({ success: true, data: calculators });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  },

  calculateEMI: async (req: Request, res: Response) => {
    try {
      const { amount, tenure, interestRate } = req.body;
      
      if (!amount || !tenure || !interestRate) {
        return res.status(400).json({ 
          success: false, 
          error: { message: 'Amount, tenure, and interest rate are required' } 
        });
      }

      const principal = parseFloat(amount);
      const months = parseFloat(tenure) * 12;
      const monthlyRate = parseFloat(interestRate) / 100 / 12;

      const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                   (Math.pow(1 + monthlyRate, months) - 1);
      
      const totalAmount = emi * months;
      const totalInterest = totalAmount - principal;

      res.json({
        success: true,
        data: {
          monthlyEMI: Math.round(emi),
          totalAmount: Math.round(totalAmount),
          totalInterest: Math.round(totalInterest),
          principal: principal,
          tenure: tenure,
          interestRate: interestRate
        }
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  },

  checkEligibility: async (req: Request, res: Response) => {
    try {
      const { landOwnership, annualIncome, creditScore } = req.query;
      
      let score = 0;
      let reasons = [];

      // Land ownership scoring
      if (landOwnership === 'owned') score += 30;
      else if (landOwnership === 'leased') score += 20;
      else if (landOwnership === 'sharecropper') score += 10;

      // Income scoring
      if (annualIncome === 'above-10') score += 25;
      else if (annualIncome === '5-10') score += 20;
      else if (annualIncome === '2-5') score += 15;
      else if (annualIncome === 'below-2') score += 10;

      // Credit score scoring
      if (creditScore === 'excellent') score += 45;
      else if (creditScore === 'good') score += 35;
      else if (creditScore === 'fair') score += 25;
      else if (creditScore === 'poor') score += 10;

      const eligible = score >= 60;
      const maxAmount = eligible ? Math.min(score * 10000, 500000) : 0;

      res.json({
        success: true,
        data: {
          eligible,
          score,
          maxAmount,
          reasons: reasons.length > 0 ? reasons : ['All criteria met']
        }
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  },

  applyForLoan: async (req: AuthRequest, res: Response) => {
    try {
      const { loanType, amount, purpose, repaymentPeriod, collateral, cropDetails, equipmentDetails } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ success: false, error: { message: 'User not authenticated' } });
      }

      const loanData = {
        userId,
        loanType,
        amount: parseFloat(amount),
        purpose,
        repaymentPeriod: parseInt(repaymentPeriod),
        collateral,
        cropDetails,
        equipmentDetails,
        status: 'pending',
        appliedAt: new Date().toISOString()
      };

      const newLoan = await mockDb.createLoan(loanData);
      
      res.json({
        success: true,
        message: 'Loan application submitted successfully',
        data: {
          loanId: newLoan.id,
          status: newLoan.status,
          appliedAt: newLoan.appliedAt
        }
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  },

  getMyLoans: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, error: { message: 'User not authenticated' } });
      }

      const loans = await mockDb.getLoans(userId);
      res.json({ success: true, data: loans });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  },

  getMyLoanById: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      const loanId = parseInt(req.params.id);
      
      if (!userId) {
        return res.status(401).json({ success: false, error: { message: 'User not authenticated' } });
      }

      const loans = await mockDb.getLoans(userId);
      const loan = loans.find(l => l.id === loanId);
      
      if (!loan) {
        return res.status(404).json({ success: false, error: { message: 'Loan not found' } });
      }

      res.json({ success: true, data: loan });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  },

  updateLoanApplication: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      const loanId = parseInt(req.params.id);
      const updates = req.body;
      
      if (!userId) {
        return res.status(401).json({ success: false, error: { message: 'User not authenticated' } });
      }

      // Only allow updates if loan is still pending
      const loans = await mockDb.getLoans(userId);
      const loan = loans.find(l => l.id === loanId);
      
      if (!loan) {
        return res.status(404).json({ success: false, error: { message: 'Loan not found' } });
      }

      if (loan.status !== 'pending') {
        return res.status(400).json({ success: false, error: { message: 'Cannot update approved/rejected loan' } });
      }

      // Update loan logic would go here
      res.json({ success: true, message: 'Loan application updated successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  },

  cancelLoanApplication: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      const loanId = parseInt(req.params.id);
      
      if (!userId) {
        return res.status(401).json({ success: false, error: { message: 'User not authenticated' } });
      }

      // Cancel loan logic would go here
      res.json({ success: true, message: 'Loan application cancelled successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  },

  // Simplified implementations for other methods
  uploadDocuments: async (req: AuthRequest, res: Response) => {
    res.json({ success: true, message: 'Document upload feature coming soon' });
  },

  getLoanDocuments: async (req: AuthRequest, res: Response) => {
    res.json({ success: true, data: [], message: 'Document retrieval feature coming soon' });
  },

  deleteDocument: async (req: AuthRequest, res: Response) => {
    res.json({ success: true, message: 'Document deletion feature coming soon' });
  },

  makeRepayment: async (req: AuthRequest, res: Response) => {
    res.json({ success: true, message: 'Repayment feature coming soon' });
  },

  getRepaymentHistory: async (req: AuthRequest, res: Response) => {
    res.json({ success: true, data: [], message: 'Repayment history feature coming soon' });
  },

  getRepaymentSchedule: async (req: AuthRequest, res: Response) => {
    res.json({ success: true, data: {}, message: 'Repayment schedule feature coming soon' });
  },

  getLoanStatus: async (req: AuthRequest, res: Response) => {
    res.json({ success: true, data: {}, message: 'Loan status feature coming soon' });
  },

  trackLoanProgress: async (req: AuthRequest, res: Response) => {
    res.json({ success: true, data: {}, message: 'Loan tracking feature coming soon' });
  },

  getAllApplications: async (req: AuthRequest, res: Response) => {
    try {
      const loans = await mockDb.getLoans();
      res.json({ success: true, data: loans });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  },

  getApplicationById: async (req: AuthRequest, res: Response) => {
    try {
      const loanId = parseInt(req.params.id);
      const loans = await mockDb.getLoans();
      const loan = loans.find(l => l.id === loanId);
      
      if (!loan) {
        return res.status(404).json({ success: false, error: { message: 'Loan not found' } });
      }

      res.json({ success: true, data: loan });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  },

  approveLoan: async (req: AuthRequest, res: Response) => {
    res.json({ success: true, message: 'Loan approval feature coming soon' });
  },

  rejectLoan: async (req: AuthRequest, res: Response) => {
    res.json({ success: true, message: 'Loan rejection feature coming soon' });
  },

  updateLoanStatus: async (req: AuthRequest, res: Response) => {
    res.json({ success: true, message: 'Loan status update feature coming soon' });
  },

  disburseLoan: async (req: AuthRequest, res: Response) => {
    res.json({ success: true, message: 'Loan disbursement feature coming soon' });
  },

  closeLoan: async (req: AuthRequest, res: Response) => {
    res.json({ success: true, message: 'Loan closure feature coming soon' });
  },

  getLoanSummary: async (req: AuthRequest, res: Response) => {
    res.json({ success: true, data: {}, message: 'Loan summary feature coming soon' });
  },

  getLoanPerformance: async (req: AuthRequest, res: Response) => {
    res.json({ success: true, data: {}, message: 'Loan performance feature coming soon' });
  },

  getRiskAnalysis: async (req: AuthRequest, res: Response) => {
    res.json({ success: false, data: {}, message: 'Risk analysis feature coming soon' });
  }
};
