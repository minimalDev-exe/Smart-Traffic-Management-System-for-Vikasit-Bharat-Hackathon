/**
 * Exact, deterministic Traffic Distribution Imbalance Score (0 - 100).
 * 
 * Problem Statement:
 *   Uneven distribution of traffic over planning authorities' jurisdictions.
 * 
 * Inputs:
 *   authorities: array of Authority objects containing:
 *     - id: string
 *     - name: string
 *     - roadUtilizationPercent: number (0 - 100)
 *     - trafficSharePercent: number (0 - 100, sum ≈ 100%)
 *     - avgSpeedKmh: number
 *     - activeBottlenecks: number
 * 
 * Mathematical Formulation:
 *   1. Utilization Standard Deviation Component (C_std, weight: 35%)
 *      sigma_U = sqrt( (1/N) * sum( (U_i - mean_U)^2 ) )
 *      C_std = min(100, (sigma_U / 35.0) * 100)
 * 
 *   2. Max/Min Authority Spread Component (C_spread, weight: 25%)
 *      delta_U = max(U_i) - min(U_i)
 *      C_spread = min(100, (delta_U / 70.0) * 100)
 * 
 *   3. Bottleneck Ratio Penalty (C_bottleneck, weight: 25%)
 *      if max(U_i) > 70%:
 *        C_bottleneck = min(100, ((max(U_i) - 70.0) / 30.0) * 100 * 1.25)
 *      else:
 *        0
 * 
 *   4. Traffic Share Disparity Component (C_share, weight: 15%)
 *      ideal_share = 100% / N (e.g. 25% for 4 authorities)
 *      disparity = sum( |S_i - ideal_share| ) / 2
 *      C_share = min(100, (disparity / 40.0) * 100)
 * 
 * Composite Weighted Imbalance Score (I):
 *   I = round( 0.35 * C_std + 0.25 * C_spread + 0.25 * C_bottleneck + 0.15 * C_share )
 *   Clamped to [0, 100].
 */

export interface AuthorityInput {
  id: string;
  name: string;
  code?: string;
  roadUtilizationPercent: number;
  trafficSharePercent: number;
  avgSpeedKmh?: number;
  activeBottlenecks?: number;
}

export type ImbalanceClassification =
  | 'OPTIMAL'
  | 'MODERATE IMBALANCE'
  | 'HIGH IMBALANCE'
  | 'CRITICAL CRISIS';

export interface ImbalanceBreakdownResult {
  score: number;
  classification: ImbalanceClassification;
  color: string;
  badgeBg: string;
  explanation: string;
  utilizationStdDev: number;
  maxMinSpreadPercent: number;
  bottleneckPenalty: number;
  trafficShareDisparity: number;
  highestLoadedAuthority: string;
  lowestLoadedAuthority: string;
  highestUtilization: number;
  lowestUtilization: number;
  weights: {
    utilizationStdDev: number;
    maxMinSpread: number;
    bottleneckRatio: number;
    trafficShareDisparity: number;
  };
}

export const IMBALANCE_WEIGHTS = {
  utilizationStdDev: 0.35,
  maxMinSpread: 0.25,
  bottleneckRatio: 0.25,
  trafficShareDisparity: 0.15,
};

export function calculateImbalanceScore(
  authorities: AuthorityInput[]
): ImbalanceBreakdownResult {
  if (!authorities || authorities.length < 2) {
    return {
      score: 0,
      classification: 'OPTIMAL',
      color: '#10B981',
      badgeBg: 'rgba(16, 185, 129, 0.15)',
      explanation: 'Insufficient authority data to compute imbalance score.',
      utilizationStdDev: 0,
      maxMinSpreadPercent: 0,
      bottleneckPenalty: 0,
      trafficShareDisparity: 0,
      highestLoadedAuthority: '',
      lowestLoadedAuthority: '',
      highestUtilization: 0,
      lowestUtilization: 0,
      weights: IMBALANCE_WEIGHTS,
    };
  }

  const n = authorities.length;
  const utilizations = authorities.map((a) => a.roadUtilizationPercent);
  const shares = authorities.map((a) => a.trafficSharePercent);
  const names = authorities.map((a) => a.name);

  // 1. Mean and Standard Deviation of Utilization
  const meanU = utilizations.reduce((acc, val) => acc + val, 0) / n;
  const varianceU =
    utilizations.reduce((acc, val) => acc + Math.pow(val - meanU, 2), 0) / n;
  const stdU = Math.sqrt(varianceU);
  const cStd = Math.min(100, (stdU / 35.0) * 100);

  // 2. Max - Min Spread
  const maxU = Math.max(...utilizations);
  const minU = Math.min(...utilizations);
  const spreadU = maxU - minU;
  const cSpread = Math.min(100, (spreadU / 70.0) * 100);

  // 3. Bottleneck Penalty
  let cBottleneck = 0;
  if (maxU > 70.0) {
    cBottleneck = Math.min(100, ((maxU - 70.0) / 30.0) * 100 * 1.25);
  }

  // 4. Traffic Share Disparity
  const idealShare = 100.0 / n;
  const rawDisparity =
    shares.reduce((acc, s) => acc + Math.abs(s - idealShare), 0) / 2.0;
  const cShare = Math.min(100, (rawDisparity / 40.0) * 100);

  // Composite Weighted Score
  const rawScore =
    IMBALANCE_WEIGHTS.utilizationStdDev * cStd +
    IMBALANCE_WEIGHTS.maxMinSpread * cSpread +
    IMBALANCE_WEIGHTS.bottleneckRatio * cBottleneck +
    IMBALANCE_WEIGHTS.trafficShareDisparity * cShare;

  const score = Math.max(0, Math.min(100, Math.round(rawScore)));

  const maxIdx = utilizations.indexOf(maxU);
  const minIdx = utilizations.indexOf(minU);
  const highestAuth = names[maxIdx];
  const lowestAuth = names[minIdx];

  // Classification, Color Coding, and Clear English Explanation
  let classification: ImbalanceClassification = 'OPTIMAL';
  let color = '#10B981'; // Green
  let badgeBg = 'rgba(16, 185, 129, 0.15)';
  let explanation = '';

  if (score <= 30) {
    classification = 'OPTIMAL';
    color = '#10B981';
    badgeBg = 'rgba(16, 185, 129, 0.15)';
    explanation = `Traffic is evenly distributed across all jurisdictions (${highestAuth}: ${maxU.toFixed(
      0
    )}%, ${lowestAuth}: ${minU.toFixed(
      0
    )}% utilization). Network capacity is well balanced.`;
  } else if (score <= 60) {
    classification = 'MODERATE IMBALANCE';
    color = '#F59E0B'; // Amber
    badgeBg = 'rgba(245, 158, 11, 0.15)';
    explanation = `Mild traffic concentration detected in ${highestAuth} (${maxU.toFixed(
      0
    )}% utilization) compared to ${lowestAuth} (${minU.toFixed(
      0
    )}%). Localized tuning recommended.`;
  } else if (score <= 80) {
    classification = 'HIGH IMBALANCE';
    color = '#F97316'; // Orange
    badgeBg = 'rgba(249, 115, 22, 0.15)';
    explanation = `Significant cross-authority disparity: ${highestAuth} is overloaded at ${maxU.toFixed(
      0
    )}% road utilization, while ${lowestAuth} operates at only ${minU.toFixed(
      0
    )}%. Cross-jurisdictional load balancing required.`;
  } else {
    classification = 'CRITICAL CRISIS';
    color = '#EF4444'; // Red
    badgeBg = 'rgba(239, 68, 68, 0.15)';
    explanation = `Severe jurisdictional bottleneck in ${highestAuth} (${maxU.toFixed(
      0
    )}% utilization, active queue spillback) while peripheral zones (${lowestAuth}: ${minU.toFixed(
      0
    )}%) hold idle capacity. Urgent AI intervention needed.`;
  }

  return {
    score,
    classification,
    color,
    badgeBg,
    explanation,
    utilizationStdDev: Number(stdU.toFixed(1)),
    maxMinSpreadPercent: Number(spreadU.toFixed(1)),
    bottleneckPenalty: Number(cBottleneck.toFixed(1)),
    trafficShareDisparity: Number(rawDisparity.toFixed(1)),
    highestLoadedAuthority: highestAuth,
    lowestLoadedAuthority: lowestAuth,
    highestUtilization: Number(maxU.toFixed(1)),
    lowestUtilization: Number(minU.toFixed(1)),
    weights: IMBALANCE_WEIGHTS,
  };
}
