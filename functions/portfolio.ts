import { Env } from './api.env';

interface PortfolioBodyRequest {
  gitConnectedProfileKey: string;
}

interface ApiResponse {
  siteMetaData?: unknown;
  profile?: unknown;
  error?: string;
}

const validateEnvironmentVars = (env: Env): boolean => {
  return !!(env.SILO_UUID_FILE && env.X_SILO_KEY);
};

const validateRequestBody = (body: PortfolioBodyRequest): boolean => {
  return !!body.gitConnectedProfileKey;
};

const fetchSiteMetadata = async (url: string, headers: HeadersInit): Promise<unknown> => {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Site metadata API failed with status: ${response.status}`);
  }
  return response.json();
};

const fetchGitConnectedProfile = async (profileKey: string): Promise<unknown> => {
  const response = await fetch(`https://gitconnected.com/v1/portfolio/${profileKey}`);
  if (!response.ok) {
    throw new Error(`GitConnected API failed with status: ${response.status}`);
  }
  return response.json();
};

const generateSuccessResponse = (data: ApiResponse): Response => {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const generateErrorResponse = (
  status: number,
  error: string,
  headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
): Response => {
  return new Response(JSON.stringify({ error }), {
    status,
    headers,
  });
};

export const onRequest: PagesFunction<Env> = async (context) => {
  try {
    if (!validateEnvironmentVars(context.env)) {
      return generateErrorResponse(500, 'Missing required environment variables');
    }

    const body = (await context.request.json()) as PortfolioBodyRequest;
    if (!validateRequestBody(body)) {
      return generateErrorResponse(400, 'Missing gitConnectedProfileKey');
    }

    const { gitConnectedProfileKey } = body;
    const { SILO_UUID_FILE: siloUUIDFile, X_SILO_KEY: siloKey } = context.env;

    const url = `https://usc-01-api.jsonsilo.com/${siloUUIDFile}`;
    const headers = {
      'X-SILO-KEY': siloKey,
      'Content-Type': 'application/json',
    };

    let siteMetaDataJson;
    try {
      siteMetaDataJson = await fetchSiteMetadata(url, headers);
    } catch (error) {
      console.error('Error fetching site metadata:', error);
      return generateErrorResponse(500, 'Failed to fetch site metadata');
    }

    let gitConnectedProfileJson;
    try {
      gitConnectedProfileJson = await fetchGitConnectedProfile(gitConnectedProfileKey);
    } catch (error) {
      console.error('Error fetching GitConnected profile:', error);
      return generateErrorResponse(500, 'Failed to fetch GitConnected profile');
    }

    // Return successful response with combined data
    return generateSuccessResponse({
      siteMetaData: siteMetaDataJson,
      profile: gitConnectedProfileJson,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return generateErrorResponse(500, 'An unexpected error occurred');
  }
};
