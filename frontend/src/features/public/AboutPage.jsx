import React from 'react';
import { RESTAURANT_IMAGES } from '../../utils/constants';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { Award, Users, HeartHandshake, Leaf, ChefHat } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="bg-[#F2E5DB] py-16 space-y-20">
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-96">
          <img
            src={RESTAURANT_IMAGES.about}
            alt="About Aura Mocha"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#38231F]/75 flex flex-col justify-center items-center text-center p-8">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#A2766B] mb-3">
              Heritage & Craftsmanship
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white mb-4">
              Our Culinary Odyssey
            </h1>
            <p className="max-w-2xl text-sm sm:text-base text-[#F2E5DB]">
              A symphony of fine dry-aged cuts, Mediterranean zest, and the alluring richness of roasted mocha.
            </p>
          </div>
        </div>
      </div>

      {/* Story Narrative */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#38231F] mb-6">
              The Genesis of Aura Mocha
            </h2>
            <p className="text-sm sm:text-base text-[#754D45] leading-relaxed mb-4">
              Established in 2008, Aura Mocha was born from an obsession with elemental gastronomy. We recognized that the roast nuances of chocolate and single-origin coffee hold the secret to elevating umami flavors in dry-aged meats, wild mushrooms, and artisanal reductions.
            </p>
            <p className="text-sm sm:text-base text-[#754D45] leading-relaxed">
              Every detail—from the bespoke walnut wood furnishings to the warm mocha ambiance—has been orchestrated to cultivate comfort, relaxation, and memorable conversation.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#D0ADA0]">
            <img
              src={RESTAURANT_IMAGES.chef}
              alt="Executive Chef"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* Pillars of Excellence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <div className="bg-white p-8 rounded-2xl border border-[#D0ADA0]/40 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-[#754D45] text-white flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-6 h-6 text-[#F2E5DB]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#38231F] mb-2">Organic Provenance</h3>
            <p className="text-xs sm:text-sm text-[#754D45]">Direct partnerships with small biodynamic farms guaranteeing sustainable practices.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-[#D0ADA0]/40 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-[#754D45] text-white flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-6 h-6 text-[#F2E5DB]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#38231F] mb-2">Michelin Pedigree</h3>
            <p className="text-xs sm:text-sm text-[#754D45]">Kitchen leaders trained across prestigious Michelin 3-star institutions worldwide.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-[#D0ADA0]/40 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-[#754D45] text-white flex items-center justify-center mx-auto mb-4">
              <HeartHandshake className="w-6 h-6 text-[#F2E5DB]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#38231F] mb-2">Unrivaled Hospitality</h3>
            <p className="text-xs sm:text-sm text-[#754D45]">Discreet, intuitive service dedicated to providing warmth and individualized care.</p>
          </div>
        </div>

        {/* Chef Statement */}
        <div className="bg-[#754D45] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col sm:flex-row items-center gap-8">
          <div className="w-28 h-28 rounded-full overflow-hidden shrink-0 border-4 border-[#A2766B]">
            <img
              src={RESTAURANT_IMAGES.chef}
              alt="Chef Marco Pierre"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-3 text-center sm:text-left">
            <p className="font-serif italic text-base sm:text-lg text-[#F2E5DB]">
              "Cooking is not just an application of heat to ingredients; it is an intimate expression of emotion, history, and warmth served across a table."
            </p>
            <div>
              <p className="font-serif font-bold text-lg text-[#A2766B]">Chef Marco Pierre</p>
              <p className="text-xs uppercase tracking-widest text-[#F2E5DB]">Executive Culinary Director</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
