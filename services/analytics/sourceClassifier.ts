/**
 * SOURCE CLASSIFIER
 * -----------------
 * Determines where a visitor came from based on referrer, UTM params, and click IDs.
 * Covers: Google Ads, Facebook/Meta, Bing, AI referrals (ChatGPT, Perplexity, Claude, 
 * Gemini, Copilot), organic search, social, email, review sites, and direct.
 */

export interface TrafficSource {
  source: string;       // google, facebook, chatgpt, direct, etc.
  medium: string;       // cpc, organic, ai-referral, organic-social, referral, email, none
  campaign: string | null;
  source_type: string;  // paid, organic, ai, social, direct, referral, email
}

export function classifySource(referrer: string | null, params: URLSearchParams): TrafficSource {
  const ref = (referrer || '').toLowerCase();

  // ========== PAID TRAFFIC (UTM tagged or click ID) ==========

  // Explicit UTM parameters take highest priority
  const utmSource = params.get('utm_source');
  const utmMedium = params.get('utm_medium');
  const utmCampaign = params.get('utm_campaign');

  if (utmSource) {
    const medium = utmMedium || 'unknown';
    const isPaid = medium === 'cpc' || medium === 'ppc' || medium === 'paid' || 
                   medium === 'paidsocial' || medium === 'paid_social' || medium === 'display';
    return {
      source: utmSource.toLowerCase(),
      medium: medium.toLowerCase(),
      campaign: utmCampaign || null,
      source_type: isPaid ? 'paid' : 'referral'
    };
  }

  // Google Ads auto-tagging (gclid without UTMs)
  if (params.get('gclid')) {
    return { source: 'google', medium: 'cpc', campaign: 'auto-tagged', source_type: 'paid' };
  }

  // Facebook/Meta auto-tagging
  if (params.get('fbclid')) {
    return { source: 'facebook', medium: 'cpc', campaign: 'auto-tagged', source_type: 'paid' };
  }

  // Bing Ads auto-tagging
  if (params.get('msclkid')) {
    return { source: 'bing', medium: 'cpc', campaign: 'auto-tagged', source_type: 'paid' };
  }

  // TikTok auto-tagging
  if (params.get('ttclid')) {
    return { source: 'tiktok', medium: 'cpc', campaign: 'auto-tagged', source_type: 'paid' };
  }

  // ========== AI / LLM REFERRALS ==========
  
  if (ref.includes('chat.openai.com') || ref.includes('chatgpt.com'))
    return { source: 'chatgpt', medium: 'ai-referral', campaign: null, source_type: 'ai' };
  
  if (ref.includes('perplexity.ai'))
    return { source: 'perplexity', medium: 'ai-referral', campaign: null, source_type: 'ai' };
  
  if (ref.includes('claude.ai'))
    return { source: 'claude', medium: 'ai-referral', campaign: null, source_type: 'ai' };
  
  if (ref.includes('gemini.google.com') || ref.includes('bard.google.com'))
    return { source: 'gemini', medium: 'ai-referral', campaign: null, source_type: 'ai' };
  
  if (ref.includes('copilot.microsoft.com'))
    return { source: 'copilot', medium: 'ai-referral', campaign: null, source_type: 'ai' };

  if (ref.includes('you.com'))
    return { source: 'you.com', medium: 'ai-referral', campaign: null, source_type: 'ai' };

  if (ref.includes('phind.com'))
    return { source: 'phind', medium: 'ai-referral', campaign: null, source_type: 'ai' };

  // ========== SEARCH ENGINES (Organic) ==========

  if (ref.includes('google.'))
    return { source: 'google', medium: 'organic', campaign: null, source_type: 'organic' };
  
  if (ref.includes('bing.com'))
    return { source: 'bing', medium: 'organic', campaign: null, source_type: 'organic' };
  
  if (ref.includes('yahoo.com') || ref.includes('search.yahoo'))
    return { source: 'yahoo', medium: 'organic', campaign: null, source_type: 'organic' };
  
  if (ref.includes('duckduckgo.com'))
    return { source: 'duckduckgo', medium: 'organic', campaign: null, source_type: 'organic' };
  
  if (ref.includes('ecosia.org'))
    return { source: 'ecosia', medium: 'organic', campaign: null, source_type: 'organic' };

  if (ref.includes('baidu.com'))
    return { source: 'baidu', medium: 'organic', campaign: null, source_type: 'organic' };

  // ========== SOCIAL (Organic) ==========

  if (ref.includes('facebook.com') || ref.includes('fb.com') || ref.includes('l.facebook.com'))
    return { source: 'facebook', medium: 'organic-social', campaign: null, source_type: 'social' };
  
  if (ref.includes('instagram.com') || ref.includes('l.instagram.com'))
    return { source: 'instagram', medium: 'organic-social', campaign: null, source_type: 'social' };
  
  if (ref.includes('pinterest.com'))
    return { source: 'pinterest', medium: 'organic-social', campaign: null, source_type: 'social' };
  
  if (ref.includes('tiktok.com'))
    return { source: 'tiktok', medium: 'organic-social', campaign: null, source_type: 'social' };
  
  if (ref.includes('youtube.com'))
    return { source: 'youtube', medium: 'organic-social', campaign: null, source_type: 'social' };
  
  if (ref.includes('twitter.com') || ref.includes('x.com') || ref.includes('t.co'))
    return { source: 'twitter', medium: 'organic-social', campaign: null, source_type: 'social' };
  
  if (ref.includes('linkedin.com'))
    return { source: 'linkedin', medium: 'organic-social', campaign: null, source_type: 'social' };
  
  if (ref.includes('reddit.com'))
    return { source: 'reddit', medium: 'organic-social', campaign: null, source_type: 'social' };
  
  if (ref.includes('nextdoor.com'))
    return { source: 'nextdoor', medium: 'organic-social', campaign: null, source_type: 'social' };

  if (ref.includes('threads.net'))
    return { source: 'threads', medium: 'organic-social', campaign: null, source_type: 'social' };

  // ========== HOME / DESIGN REFERRALS ==========
  
  if (ref.includes('houzz.com'))
    return { source: 'houzz', medium: 'referral', campaign: null, source_type: 'referral' };
  
  if (ref.includes('homeadvisor.com'))
    return { source: 'homeadvisor', medium: 'referral', campaign: null, source_type: 'referral' };
  
  if (ref.includes('yelp.com'))
    return { source: 'yelp', medium: 'referral', campaign: null, source_type: 'referral' };

  if (ref.includes('angi.com') || ref.includes('angieslist.com'))
    return { source: 'angi', medium: 'referral', campaign: null, source_type: 'referral' };

  if (ref.includes('thumbtack.com'))
    return { source: 'thumbtack', medium: 'referral', campaign: null, source_type: 'referral' };

  // ========== EMAIL ==========
  
  if (ref.includes('mail.google.com') || ref.includes('outlook.') || ref.includes('mail.yahoo') || 
      ref.includes('mail.aol') || ref.includes('protonmail'))
    return { source: 'email', medium: 'email', campaign: null, source_type: 'email' };

  // ========== OTHER REFERRAL ==========
  
  if (ref && ref !== '' && ref !== 'null') {
    try {
      const hostname = new URL(referrer!).hostname.replace('www.', '');
      return { source: hostname, medium: 'referral', campaign: null, source_type: 'referral' };
    } catch {
      return { source: 'unknown-referral', medium: 'referral', campaign: null, source_type: 'referral' };
    }
  }

  // ========== DIRECT ==========
  return { source: 'direct', medium: 'none', campaign: null, source_type: 'direct' };
}
