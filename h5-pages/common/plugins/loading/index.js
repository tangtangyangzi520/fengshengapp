import LoadingComponent from '../../components/loading/loading-toast'

let $vm
let watcher

const plugin = {
    install(vue, content) {
        const Loading = vue.extend(LoadingComponent)

        if (!$vm) {
            $vm = new Loading({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }
        $vm.show = false;
        const loading = {
            show(options = {}) {
                // destroy watcher
                watcher && watcher()
                if (typeof options === 'string') {
                    $vm.content = content
                } else {
                    $vm.content = 'loading'
                }
                $vm.show = true
            },
            hide() {
                $vm.show = false
            }
        }

        // all ui's plugins are included in this.$ui
        vue.$loading = loading

        vue.mixin({
            created: function() {
                this.$loading = vue.$loading;
            }
        })
    }
}

export default plugin
export const install = plugin.install