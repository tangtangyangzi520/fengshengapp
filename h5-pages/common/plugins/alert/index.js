import AlertComponent from '../../components/alert/alert'

let $vm

const plugin = {
    install(Vue) {
        if (!$vm) {
            const Alert = Vue.extend(AlertComponent)
            $vm = new Alert({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }
        $vm.show = false;
        const alert = {
            show(options = {}) {
                $vm.content = options.content ? options.content : '确定吗';
                $vm.onhide = () => {
                    options.onhide && options.onhide()
                    $vm.show = false;
                };
                this.watcher && this.watcher()
                $vm.show = true
            },
            hide() {
                $vm.show = false
                this.watcher && this.watcher()
                this.watcher = null
            }
        }

        Vue.$alert = alert
        Vue.mixin({
            created: function() {
                this.$alert = Vue.$alert
            }
        })
    }
}

export default plugin
export const install = plugin.install