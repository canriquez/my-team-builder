# lib/capistrano/tasks/react.rake
namespace :react do
    desc 'RUN NPM BUILD'
      task :build do
        on roles(:app) do
          execute "sh -c \"cd #{deploy_to}/current/ && #{fetch(:build_command)}\""
        end
    end
  end