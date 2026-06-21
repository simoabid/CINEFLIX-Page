import React, { useState } from 'react';
import { PricingPlan } from '../types/landing';

const PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Try before you commit',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      'Full TMDB library',
      '720p streaming quality',
      '1 active device connection',
    ],
    mutedFeatures: [
      'Offline downloads support',
      'Completely Ad-free',
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'Best value for individuals',
    monthlyPrice: 9.99,
    annualPrice: 6.99,
    features: [
      '10,000+ premium titles',
      '4K Ultra HD + Dolby Atmos',
      '2 active device connections',
      'Offline downloads support',
      'Completely Ad-free',
    ],
    isPopular: true
  },
  {
    id: 'family',
    name: 'Family',
    description: 'Share with your loved ones',
    monthlyPrice: 15.99,
    annualPrice: 11.19,
    features: [
      'Everything in Standard',
      '5 active device connections',
      '5 personal profiles + Kids mode',
      'Advanced parental controls',
      'Priority customer support',
    ]
  }
];

export const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleToggle = () => {
    setAnimating(true);
    setIsAnnual((prev) => !prev);
    setTimeout(() => {
      setAnimating(false);
    }, 250);
  };

  return (
    <section className="py-24 bg-background-primary text-white relative" id="pricing">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.03),transparent_60%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="bg-accent-red/10 border border-accent-red/20 text-accent-red px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display mt-4 mb-2">
            Simple, Transparent <span className="text-accent-red font-extrabold">Plans</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base">
            Start free. Upgrade anytime. Cancel whenever.
          </p>
        </div>

        {/* Annual Toggle Switch */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <button
            onClick={() => isAnnual && handleToggle()}
            className={`text-sm font-semibold transition-colors duration-250 cursor-pointer ${
              !isAnnual ? 'text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Monthly
          </button>
          
          <button
            onClick={handleToggle}
            className="w-14 h-8 bg-white/5 border border-white/10 rounded-full p-1 relative flex items-center transition-colors duration-250 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-red/50"
            aria-label="Toggle annual pricing"
          >
            <div
              className={`w-6 h-6 bg-accent-red rounded-full shadow-lg shadow-accent-red/35 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isAnnual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>

          <button
            onClick={() => !isAnnual && handleToggle()}
            className={`text-sm font-semibold transition-colors duration-250 cursor-pointer flex items-center gap-2 ${
              isAnnual ? 'text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Annual
            <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
              Save 30%
            </span>
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {PLANS.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            
            return (
              <div
                key={plan.id}
                className={`bg-glass-card hover:bg-glass-card-hover border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow relative flex flex-col justify-between min-h-[500px] ${
                  plan.isPopular
                    ? 'border-accent-red shadow-[0_0_40px_rgba(229,9,20,0.1)]'
                    : 'border-glass-border hover:border-glass-border-hover'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-red text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-accent-red/30">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold font-display mb-1 text-white">{plan.name}</h3>
                    <p className="text-gray-400 text-xs">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 flex flex-col">
                    <div className="flex items-baseline">
                      <span
                        className={`text-4xl font-extrabold tracking-tight transition-all duration-200 ${
                          animating ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
                        }`}
                      >
                        ${price.toFixed(2)}
                      </span>
                      <span className="text-gray-400 text-xs ml-2">/month</span>
                    </div>
                    {isAnnual && plan.id !== 'free' && (
                      <span className="text-[10px] text-emerald-400 font-medium mt-1">
                        Billed annually (${(price * 12).toFixed(2)})
                      </span>
                    )}
                    {!isAnnual && plan.id !== 'free' && (
                      <span className="text-[10px] text-gray-500 mt-1">
                        Cancel anytime
                      </span>
                    )}
                    {plan.id === 'free' && (
                      <span className="text-[10px] text-gray-500 mt-1">
                        No credit card needed
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-8 text-sm text-gray-300">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg
                          className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.mutedFeatures?.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-500 line-through">
                        <svg
                          className="w-4 h-4 text-gray-600 shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#download"
                  className={`w-full py-3 rounded-xl font-semibold text-center text-sm transition-all duration-200 ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-accent-red to-accent-red-dark text-white shadow-lg shadow-accent-red/20 hover:shadow-accent-red/35 active:scale-97'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-97'
                  }`}
                >
                  {plan.id === 'free' ? 'Get Started' : 'Start Free Trial'}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
