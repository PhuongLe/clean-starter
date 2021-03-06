import { AwilixContainer, createContainer, InjectionMode, Lifetime } from "awilix";
import { IContainer } from "../../domain/container/Container";

export class Container implements IContainer {
  private readonly container: AwilixContainer

  constructor() {
    this.container = createContainer({
      injectionMode: InjectionMode.CLASSIC
    })
    this.container.loadModules(
      [
        "./dist/lib/interfaces/**/*.js",
        "./dist/lib/application/use_cases/**/*.js",
        "./dist/lib/interfaces/controllers/**/*.js"
      ],
      {
        formatName: 'camelCase',
        resolverOptions: {
          lifetime: Lifetime.SINGLETON
        }
      }
    )
    console.debug("[DI] Loaded", Object.keys(this.container.registrations))
  }
  public resolve<T>(name: string): T {
    return this.container.resolve<T>(name)
  }
}
