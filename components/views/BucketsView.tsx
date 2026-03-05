'use client';

import { BUCKETS } from '@/lib/constants';
import BucketCard from '../BucketCard';
import { Target } from 'lucide-react';

export default function BucketsView() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4 md:px-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3 flex-wrap">
          <Target className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex-shrink-0" />
          <span>My Three Buckets</span>
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-white/60">
          Understand and manage your life's three essential areas
        </p>
      </div>

      {/* Bucket Philosophy */}
      <div className="premium-card rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border-l-4 border-emerald-500">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">The 3-Bucket Philosophy</h2>
        <p className="text-sm sm:text-base text-white/80 mb-3 sm:mb-4 leading-relaxed">
          Balance your life by investing time across three critical buckets. Each bucket represents 
          a fundamental aspect of personal growth and fulfillment.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-emerald-400 font-bold text-sm">1</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-emerald-400 mb-1">Career Growth</p>
              <p className="text-xs text-white/60">Skills that generate income and opportunities</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-rose-400 font-bold text-sm">2</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-rose-400 mb-1">Well-Being</p>
              <p className="text-xs text-white/60">Physical, mental, and social health</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-violet-400 font-bold text-sm">3</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-violet-400 mb-1">Exploration</p>
              <p className="text-xs text-white/60">Creative projects and learning</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buckets Grid */}
      <div className="space-y-4 sm:space-y-6">
        {BUCKETS.map((bucket, index) => (
          <div key={bucket.id}>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-sm sm:text-base ${
                bucket.id === 'money' ? 'bg-emerald-500/20 text-emerald-400' : 
                bucket.id === 'soul' ? 'bg-rose-500/20 text-rose-400' : 
                'bg-violet-500/20 text-violet-400'
              }`}>
                {index + 1}
              </div>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                  {bucket.name}
                </h2>
              </div>
            </div>
            <BucketCard bucket={bucket} />
          </div>
        ))}
      </div>
    </div>
  );
}
