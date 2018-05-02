import ToastComponent from '../../components/toast'

let $vm

const plugin = {
    install(Vue) {
        if (!$vm) {
            const Toast = Vue.extend(ToastComponent)
            $vm = new Toast({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }
        $vm.show = false;
        const toast = {
            show(options = {}) {
                $vm.content = options.content ? options.content : '提示信息';
                this.timer && clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    $vm.show = false;
                }, options.time ? options.time : 2000)
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

        Vue.$toast = toast
        Vue.mixin({
            created: function() {
                this.$toast = Vue.$toast
            }
        })
    }
}

export default plugin
export const install = plugin.install