# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "debian/stretch64"

  config.vm.network "private_network", ip: "192.168.34.88"

  config.vm.synced_folder ".", "/vagrant",
      type: "nfs",
      mount_options: ['rw', 'vers=3', 'tcp', 'fsc', 'actimeo=1']
end
