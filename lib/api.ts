import {BoundlessClient} from 'boundless-api-client';

const baseURL = process.env.BOUNDLESS_API_BASE_URL;
const s3Prefix = process.env.BOUNDLESS_S3_PREFIX;
const mediaServer = process.env.BOUNDLESS_MEDIA_SERVER;

const apiClient = new BoundlessClient('token');
apiClient.setInstanceId(1 as unknown as number);

if (baseURL) {
	apiClient.setBaseUrl(baseURL);
}

if (s3Prefix) {
	apiClient.setS3FolderPrefix(s3Prefix);
}

if (mediaServer) {
	apiClient.setMediaServerUrl(mediaServer);
}

export {apiClient};