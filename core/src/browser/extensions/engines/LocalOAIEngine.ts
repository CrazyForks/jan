import { executeOnMain, systemInformation, dirName } from '../../core'
import { events } from '../../events'
import { Model, ModelEvent } from '../../../types'
import { OAIEngine } from './OAIEngine'

/**
 * Base OAI Local Inference Provider
 * Added the implementation of loading and unloading model (applicable to local inference providers)
 */
export abstract class LocalOAIEngine extends OAIEngine {
  // The inference engine
  abstract nodeModule: string
  loadModelFunctionName: string = 'loadModel'
  unloadModelFunctionName: string = 'unloadModel'

  /**
   * This class represents a base for local inference providers in the OpenAI architecture.
   * It extends the OAIEngine class and provides the implementation of loading and unloading models locally.
   * The loadModel function subscribes to the ModelEvent.OnModelInit event, loading models when initiated.
   * The unloadModel function subscribes to the ModelEvent.OnModelStop event, unloading models when stopped.
   */
  override onLoad() {
    super.onLoad()
    // These events are applicable to local inference providers
    events.on(ModelEvent.OnModelInit, (model: Model) => this.loadModel(model))
    events.on(ModelEvent.OnModelStop, (model: Model) => this.unloadModel(model))
  }

  /**
   * Load the model.
   */
  override async loadModel(model: Model): Promise<void> {
    return Promise.resolve()
  }
  /**
   * Stops the model.
   */
  override async unloadModel(model?: Model) {
    if (model?.engine && model.engine?.toString() !== this.provider) return Promise.resolve()

    this.loadedModel = undefined
    await executeOnMain(this.nodeModule, this.unloadModelFunctionName).then(() => {
      events.emit(ModelEvent.OnModelStopped, {})
    })
  }
}
