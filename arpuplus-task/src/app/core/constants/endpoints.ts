import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;
export class Endpoints {
  public static readonly HOME = baseUrl + '/api/home';
  public static readonly ABOUT = baseUrl + '/api/about';
  public static readonly NEWS = baseUrl + '/api/news';
  public static readonly PROJECTS = baseUrl + '/api/projects';
  public static readonly CONTACT = baseUrl + '/api/contact';
  public static readonly BLOGS = baseUrl + '/api/blogs';
  public static readonly SERVICES = baseUrl + '/api/services';
}
