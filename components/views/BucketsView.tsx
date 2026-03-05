'use client';

import { BUCKETS } from '@/lib/constants';
import BucketCard from '../BucketCard';
import { Target } from 'lucide-react';

export default function BucketsView() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 flex items-center gap-2 md:gap-3">
          <Target className="w-6 h-6 md:w-8 md:h-8 text-emerald-400" />
          My Three Buckets
        </h1>
        <p className="text-sm md:text-base text-slate-400">
          Understand and manage your life's three essential areas
        </p>
      </div>

      {/* Bucket Philosophy */}
      <div className="glass-effect rounded-xl p-6 md:p-8 border-l-4 border-emerald-500">
        <h2 className="text-xl font-bold text-white mb-3">The 3-Bucket Philosophy</h2>
        <p className="text-slate-300 mb-4 leading-relaxed">
          Balance your life by investing time across three critical buckets. Each bucket represents 
          a fundamental aspect of personal growth and fulfillment.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-emerald-400 font-bold">1</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-400 mb-1">Career Growth</p>
              <p className="text-xs text-slate-400">Skills that generate income and opportunities</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-rose-400 font-bold">2</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-rose-400 mb-1">Well-Being</p>
              <p className="text-xs text-slate-400">Physical, mental, and social health</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-violet-400 font-bold">3</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-violet-400 mb-1">Exploration</p>
              <p className="text-xs text-slate-400">Creative projects and learning</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buckets Grid */}
      <div className="space-y-6">
        {BUCKETS.map((bucket, index) => (
          <div key={bucket.id}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg
                ${bucket.id === 'money' ? 'bg-emerald-500/20 text-emerald-400' : 
                  bucket.id === 'soul' ? 'bg-rose-500/20 text-rose-400' : 
                  'bg-violet-500/20 text-violet-400'}
              `}>
                {index + 1}
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">
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
